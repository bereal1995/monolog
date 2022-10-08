import styled from '@emotion/styled'

export const Block = styled.div`
  margin-bottom: 30px;
  word-break: break-all;
  > pre {
    overflow: auto;
    margin-bottom: 5px;
    padding: 15px;
    border-radius: 5px;
    white-space: pre-wrap;
  }
`

export const CodeHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #6089bd;
  padding: 5px;
  margin-bottom: 10px;
  line-height: 1.3;

  .language_name {
    padding-right: 5px;
  }
`
export const CodeContent = styled.div`
  /* .line {
    display: table-row;
  } */

  .line_no {
    display: table-cell;
    text-align: right;
    padding-right: 1em;
    user-select: none;
    opacity: 0.5;
  }

  .line_content {
    display: table-cell;
  }
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #79b3fd;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    cursor: unset;
  }
`
export const PlayContent = styled.div`
  position: relative;
  display: flex;

  .play_button {
    min-height: 50px;
    border: 1px solid #79b3fd;
    border-radius: 5px;
    transition: all 0.25s ease-in-out;
    &:hover {
      background: #79b3fd;
      color: #fff;
    }
  }

  .play_button.play {
    margin-right: 10px;
  }
  .play_button.reset {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
  }

  .line_item {
    display: block;
    margin-bottom: 10px;
  }
`
