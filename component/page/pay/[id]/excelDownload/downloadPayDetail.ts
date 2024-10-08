import ExcelJS from "exceljs";
import { dateFormattedtoNum, formatPhone } from "../../../../../libs/client/utils";
export const downloadPayDetail = ({
  title,
  memberData,
  header,
  content,
}: {
  title: string;
  memberData: any;
  header?: any;

  content: any;
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
  ws.mergeCells("A1:E2");

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
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  ws.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(1).height = 52;
  //-------------------------------------------------------- 이름

  ws.getCell("A3").value = {
    richText: [
      {
        text: "이름",
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("A3").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  ws.getCell("A3").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f5f5f4" },
  };

  ws.getCell("A3").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  ws.getCell("B3").value = {
    richText: [
      {
        text: memberData?.name ?? "-",
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("B3").border = {
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  // ws.getCell("B3").fill = {
  //   type: "pattern",
  //   pattern: "solid",
  //   fgColor: { argb: "f5f5f4" },
  // };

  ws.getCell("B3").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  //-------------------------------------------------------- 담당

  ws.getCell("C3").value = {
    richText: [
      {
        text: "담당",
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("C3").border = {
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  ws.getCell("C3").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  ws.getCell("C3").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f5f5f4" },
  };

  ws.mergeCells("D3:E3");

  ws.getCell("D3").value = {
    richText: [
      {
        text: memberData?.worker ?? "-",
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("D3").border = {
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  ws.getCell("D3").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  //-------------------------------------------------------- 연락처

  ws.getCell("A4").value = {
    richText: [
      {
        text: "연락처",
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("A4").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  ws.getCell("A4").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f5f5f4" },
  };

  ws.getCell("A4").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  ws.getCell("B4").value = {
    richText: [
      {
        text: formatPhone(memberData?.phone ?? "-"),
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("B4").border = {
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  // ws.getCell("B4").fill = {
  //   type: "pattern",
  //   pattern: "solid",
  //   fgColor: { argb: "f5f5f4" },
  // };

  ws.getCell("B4").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  //-------------------------------------------------------- 납부

  ws.getCell("C4").value = {
    richText: [
      {
        text: "납부 /총 납부",
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("C4").border = {
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  ws.getCell("C4").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  ws.getCell("C4").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f5f5f4" },
  };

  ws.mergeCells("D4:E4");

  ws.getCell("D4").value = {
    richText: [
      {
        text: memberData?.record,
        font: { size: 12, bold: true },
      },
    ],
  };

  ws.getCell("D4").border = {
    right: { style: "thin" },
    bottom: { style: "thin" },
  };

  // ws.getCell("D4").fill = {
  //   type: "pattern",
  //   pattern: "solid",
  //   fgColor: { argb: "f5f5f4" },
  // };

  ws.getCell("D4").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  ws.getRow(2).height = 20;

  ws.getRow(3).height = 30;
  ws.getRow(4).height = 30;

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
    newRow.height = 32;
    newRow.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
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
