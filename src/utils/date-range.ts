import { DateRange } from 'react-day-picker'

export const parseDateRangeFromQuery = (
  startDateStr: string | null,
  endDateStr: string | null,
): DateRange => {
  const parseDate = (str: string | null): Date | undefined => {
    if (!str) return undefined

    const [day, month, year] = str.split('/').map(Number)

    return new Date(year, month - 1, day)
  }

  return {
    from: parseDate(startDateStr),
    to: parseDate(endDateStr),
  }
}

export const formatRangeDate = (from: Date, to?: Date): string => {
  const fromFormatted = from.toLocaleDateString('pt-BR')
  const toFormatted = to ? ` até ${to.toLocaleDateString('pt-BR')}` : ''

  return `${fromFormatted}${toFormatted}`
}
