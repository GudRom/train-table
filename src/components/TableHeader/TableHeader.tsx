const TableHeader = ({ headers }: { headers: string[] }) => {
  return (
    <thead className="bg-emerald-100">
      <tr>
        {headers.map((title, index) => (
          <th key={index}>{title}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
