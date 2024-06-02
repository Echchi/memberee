import * as XLSX from "xlsx";

export const readXlsx = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) {
        return;
      }

      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });

      // console.log(
      //   "jsonData",
      //   jsonData.filter((item: any) => item.length > 0),
      // );
      resolve(jsonData.slice(6).filter((item: any) => item.length > 0));
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
};
