import ExcelJS from "exceljs";
import { formatKorDate } from "@/libs/client/utils";
import { format } from "date-fns";
export const downloadMemberList = ({
  title,
  total,
  header,
  content,
}: {
  title: string;
  total?: number;
  header?: any;
  content?: any;
}) => {
  console.log("content", content);

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(title, {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      horizontalCentered: true,
    },
  });

  // 셀 병합
  ws.mergeCells("A1:J2");

  ws.getCell("A1").value = {
    richText: [
      {
        text: `${title}`,
        font: { size: 20, bold: true },
      },
    ],
  };

  ws.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f5f5f4" },
  };

  ws.getCell("A1").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  ws.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(1).height = 52;

  ws.mergeCells("A3:E3");

  ws.getCell("A3").value = {
    richText: [
      {
        text: format(new Date(), "yyyy. MM. dd."),
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("A3").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f5f5f4" },
  };

  ws.getCell("A3").border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
  };

  ws.mergeCells("F3:J3");

  ws.getCell("F3").value = {
    richText: [
      {
        text: `총 ${total} 명`,
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("F3").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f5f5f4" },
  };

  ws.getCell("F3").border = {
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  ws.getCell("F3").alignment = {
    horizontal: "right",
    vertical: "middle",
  };

  ws.getRow(2).height = 20;

  ws.getRow(3).height = 30;

  ws.columns = header.map((col: any, index: number) => ({
    key: col.key,
    width: index === 5 ? 42 : 20,
    height: 30,
  }));

  const headerRow = ws.addRow(header.map((h: any) => h.header));
  headerRow.eachCell((cell, colNumber) => {
    cell.font = { size: 13, bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "f5f5f4" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  headerRow.height = 25;

  // 데이터 행 추가
  content.forEach((item: any) => {
    const newRow = ws.addRow(header.map((h: any) => item[h.key]));
    newRow.alignment = { horizontal: "center", vertical: "middle" };
    newRow.height = 32;
  });

  let promise: any[] = [];
  Promise.all(promise).then(() => {
    wb.xlsx.writeBuffer().then((b) => {
      let a = new Blob([b]);
      let url = window.URL.createObjectURL(a);

      let elem = document.createElement("a");
      elem.href = url;
      elem.download = `${title}.xlsx`;
      elem.click();
      elem.remove();
    });
  });
};
