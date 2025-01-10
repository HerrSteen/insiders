import { useSelector } from 'react-redux';
import { selectWordCount } from './editorSlice'

interface Props {
  suggestedWord: string;
}

const WordBar: React.FC<Props> = ({ suggestedWord }) => {
  const wordCount = useSelector(selectWordCount)
  return (<>
    <div className="toolbar__wrapper">
      {!!wordCount && <p className="toolbar__wordcount">{wordCount}</p>}
    </div>

    {suggestedWord.length > 0 && <p className="wordBar__suggestion">{suggestedWord}</p>}
  </>
  )
}

export default WordBar
