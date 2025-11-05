type Column<T> = {
  header: string
  accessor: T
}

type TableProps<T> = {
  data: T[]
  columns: Column<keyof T>[]
}

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
}: TableProps<T>) => (
  <div className="bg-foreground border border-border rounded-md overflow-hidden shadow-md">
    <table className="min-w-full table-auto text-sm">
      <thead className="bg-background">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.accessor)}
              className="px-4 py-9 text-left font-bold"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length > 0 ? (
          data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-200/4 transition-colors">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-4 py-9">
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-16">
              Nenhum dado encontrado!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)
