import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBrand } from '@/hooks/useBrand'
import { Search, Download, Filter } from 'lucide-react'
import { ReactNode, useState } from 'react'

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  cell?: (row: T) => ReactNode
  sortable?: boolean
  className?: string
}

export interface DataTableProps<T> {
  title?: string
  description?: string
  columns: DataTableColumn<T>[]
  data: T[]
  searchable?: boolean
  searchPlaceholder?: string
  actions?: ReactNode
  loading?: boolean
  emptyMessage?: string
  className?: string
}

/**
 * DataTable - Professional data table component
 * 
 * Perfect for: Admin panels, data management, lists
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { key: 'name', header: 'Name', sortable: true },
 *   { key: 'email', header: 'Email' },
 *   { 
 *     key: 'status', 
 *     header: 'Status',
 *     cell: (row) => (
 *       <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
 *         {row.status}
 *       </Badge>
 *     )
 *   },
 * ]
 * 
 * <DataTable
 *   title="Users"
 *   columns={columns}
 *   data={users}
 *   searchable
 * />
 * ```
 */
export function DataTable<T extends Record<string, unknown>>({
  title,
  description,
  columns,
  data,
  searchable = false,
  searchPlaceholder = 'Search...',
  actions,
  loading = false,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {
  const { classes, config } = useBrand()
  const [searchQuery, setSearchQuery] = useState('')

  // Simple client-side search
  const filteredData = searchQuery
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className={cn(
        'relative overflow-hidden',
        config.preferredCardStyle === 'glass' && 'bg-background/50 backdrop-blur-sm',
        config.preferredCardStyle === 'elevated' && classes.shadow,
        config.preferredCardStyle === 'bordered' && 'border-2',
      )}>
        {/* Header */}
        {(title || searchable || actions) && (
          <div className={cn('border-b', classes.cardPadding)}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                {title && (
                  <h3 className="text-lg font-semibold">{title}</h3>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {searchable && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                )}
                {actions}
              </div>
            </div>
          </div>
        )}
        
        {/* Table */}
        <div className="relative overflow-x-auto">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-2">
              <p className="text-muted-foreground">{emptyMessage}</p>
              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead
                      key={index}
                      className={cn(
                        column.className,
                        column.sortable && 'cursor-pointer hover:text-foreground'
                      )}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: rowIndex * 0.05 }}
                    className="group hover:bg-muted/50"
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className={column.className}>
                        {column.cell
                          ? column.cell(row)
                          : row[column.key as keyof T]}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

/**
 * Quick action buttons for data tables
 */
export function DataTableActions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  )
}

