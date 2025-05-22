import { PaymentType } from "@prisma/client";
import ExcelJS from "exceljs";

export const onClickUploadXLSX = ({
  title,
  header,
  content,
  isMember = false,
  paymentType,
}: {
  title: string;
  header?: any;
  content?: any;
  isMember?: boolean;
  paymentType?: PaymentType;
}) => {
  const isPayDiff = paymentType === PaymentType.DIFFERENT;
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(title, {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      horizontalCentered: true,
    },
  });

  // 셀 병합
  isMember
    ? isPayDiff
      ? ws.mergeCells("A1:J2")
      : ws.mergeCells("A1:I2")
    : ws.mergeCells("A1:H2");

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

  isMember
    ? isPayDiff
      ? ws.mergeCells("A3:J3")
      : ws.mergeCells("A3:I3")
    : ws.mergeCells("A3:H3");

  ws.getCell("A3").value = {
    richText: [
      {
        text: "예시를 삭제하지 말아주세요! 데이터는 7번째 줄부터 등록됩니다!",

        font: { size: 12, bold: true, color: { argb: "D1180B" } },
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
    right: { style: "thin" },
  };

  ws.getRow(3).height = 30;

  ws.columns = header.map((col: any, index: number) => ({
    key: col.key,
    width: isMember && index === 5 ? 55 : 20,
    height: 20,
  }));

  const headerRow = ws.addRow(header.map((h: any) => h.header));
  headerRow.eachCell((cell, colNumber) => {
    cell.font = { bold: true };
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
  headerRow.height = 20;

  // 데이터 행 추가
  content.forEach((item: any, index: number) => {
    const newRow = ws.addRow(header.map((h: any) => item[h.key]));
    newRow.eachCell((cell, colNumber) => {
      if (colNumber === 2 || colNumber === 8) {
        cell.numFmt = "@";
      }
      if (index === 0 || index === 1) {
        cell.font = { color: { argb: "D1180B" } }; // 첫 줄은 빨간색
      } else {
        cell.font = { color: { argb: "666666" } }; // 나머지 줄은 회색
      }
    });
    newRow.height = 32;
  });

  const totalRows = 100;
  for (let i = content.length + 1; i <= totalRows; i++) {
    const newRow = ws.addRow(header.map(() => ""));
    newRow.eachCell((cell, colNumber) => {
      if (colNumber === 2 || colNumber === 8) {
        cell.numFmt = "@";
      }
    });
    newRow.height = 32;
  }

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
