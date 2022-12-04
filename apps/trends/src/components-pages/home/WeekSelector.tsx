import styled from '@emotion/styled'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { addWeekToRange } from '@/lib/week'
import { colors } from '@/lib/colors'

interface Props {
  dateRange: string[]
}

const SERVICE_START_DATE = new Date('2022-10-01')

function WeekSelector({ dateRange }: Props) {
  const [startDate, endDate] = useMemo(() => {
    const [startDate, endDate] = dateRange
    const start = format(new Date(startDate), 'yyyy년 MM월 dd일')
    const end = format(new Date(endDate), 'yyyy년 MM월 dd일')
    return [start, end]
  }, [dateRange])
  const router = useRouter()

  const onClickPrev = () => {
    const [start, end] = addWeekToRange(dateRange, -1)
    router.push({ query: { mode: 'past', start, end } })
  }
  const onClickNext = () => {
    const [start, end] = addWeekToRange(dateRange, 1)
    router.push({ query: { mode: 'past', start, end } })
  }
  const [prevDisabled, nextDisabled] = useMemo(() => {
    const today = new Date(format(new Date(), 'yyyy-MM-dd'))
    const [start, end] = dateRange.map((date) => new Date(date))
    return [start <= SERVICE_START_DATE, end >= today]
  }, [dateRange])
  return (
    <Block>
      <DateInfo>
        {startDate} ~ {endDate}
      </DateInfo>
      <WeekNavigator>
        <TextButton onClick={onClickPrev} disabled={prevDisabled}>
          저번 주
        </TextButton>
        <TextButton onClick={onClickNext} disabled={nextDisabled}>
          다음 주
        </TextButton>
      </WeekNavigator>
    </Block>
  )
}

const Block = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  color: ${colors.gray5};
`
const DateInfo = styled.div``
const WeekNavigator = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`
const TextButton = styled.button`
  display: inline-flex;
  font-size: inherit;
  text-decoration: underline;
  &:disabled {
    color: ${colors.gray2};
    text-decoration: none;
  }
`

export default WeekSelector
