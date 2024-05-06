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
  const ws = wb.addWorksheet("직원등록", {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      horizontalCentered: true,
    },
  });

  ws.columns = header.map((col: any) => ({
    key: col.key,
    width: 20,
    style: { font: { size: 24 } },
  }));

  // let excelData = [];
  // excelData.push(title, header, content);

  // excelData.forEach((item, index) => {
  //   ws.getRow(index).values = [...item];
  // });

  // 셀 병합
  ws.mergeCells("A1:H2");

  ws.getCell("A1").value = title;
  // 폰트 사이즈, 굵기, 색상 변경
  ws.getCell("A1").font = { size: 18, bold: true };
  ws.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };

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
    const row = header.map((h: any) => item[h.key]);
    ws.addRow(row);
  });
  // ws.columns = header;
  // 색 칠하기
  // ws.getCell("A3", "H3").fill = {
  //   type: "pattern",
  //   pattern: "solid",
  //   fgColor: { argb: "#e5e5e5" },
  // };

  // 테두리
  // ws.getCell("A1").border = {
  //   top: { style: "thin", color: { argb: "000000" } },
  //   bottom: { style: "thin", color: { argb: "000000" } },
  //   left: { style: "thin", color: { argb: "000000" } },
  //   right: { style: "thin", color: { argb: "000000" } },
  // };

  // 가로 길이
  // const col = [];
  // for (let i = 0; i < content.length; i++) {
  //   col.push(content[i]);
  // }
  // ws.columns = col;
  //
  // 세로 길이
  for (let i = 1; i <= content.length + 3; i++) {
    let row = ws.getRow(i);
    row.height = 14;
    row.font = { italic: true, color: { argb: "666666" } };
  }

  // 줄 바꿈
  // ws.getCell("A3").alignment = { wrapText: true };
  // ws.insertRows(1, [title]);
  // ws.insertRows(2, header);

  let promise: any[] = [];
  Promise.all(promise).then(() => {
    wb.xlsx.writeBuffer().then((b) => {
      let a = new Blob([b]);
      let url = window.URL.createObjectURL(a);

      let elem = document.createElement("a");
      elem.href = url;
      elem.download = "직원등록양식.xlsx";
      elem.click();
      elem.remove();
    });
  });
};
