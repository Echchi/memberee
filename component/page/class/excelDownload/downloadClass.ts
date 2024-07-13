import ExcelJS from "exceljs";
import { dateFormattedtoNum, formatKorDate } from "../../../../libs/client/utils";
import { format } from "date-fns";
export const downloadClass = ({
  title,
  sub,
  header,
  content,
}: {
  title: string;
  sub?: string;
  header?: any;
  content?: any;
}) => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(title, {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      horizontalCentered: true,
    },
  });

  // 셀 병합
  ws.mergeCells("A1:H2");

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

  ws.mergeCells("A3:H3");

  ws.getCell("A3").value = {
    richText: [
      {
        text: sub || "",
        font: { size: 14, bold: true },
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
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  ws.columns = header.map((col: any, index: number) => ({
    key: col.key,
    width: 20,
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
    newRow.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  wb.xlsx.writeBuffer().then((b) => {
    let a = new Blob([b]);
    let url = window.URL.createObjectURL(a);

    let elem = document.createElement("a");
    elem.href = url;
    elem.download = `${title}_${dateFormattedtoNum(new Date())}.xlsx`;
    elem.click();
    elem.remove();
  });
};
