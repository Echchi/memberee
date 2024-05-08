import ExcelJS from "exceljs";
export const onClickXLSX = ({
  title,
  header,
  content,
}: {
  title: string;
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

  ws.columns = header.map((col: any) => ({
    key: col.key,
    width: 20,
    height: 20,
  }));

  // 셀 병합
  ws.mergeCells("A1:H2");

  ws.getCell("A1").value = {
    richText: [
      {
        text: title,
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
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  ws.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(1).height = 52;

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
  content.forEach((item: any) => {
    const newRow = ws.addRow(header.map((h: any) => item[h.key]));
    newRow.eachCell((cell) => {
      cell.font = { color: { argb: "666666" } };
    });
    newRow.height = 20;
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
