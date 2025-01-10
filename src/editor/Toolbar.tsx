import { useDispatch } from 'react-redux';
import { toggleReadMode, toggleSendItIcon, toggleTheme } from './editorSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faFeatherPointed, faGlasses, faPrayingHands } from '@fortawesome/free-solid-svg-icons'
interface Props {
  onResetClick: () => void;
  saveEditor: (() => void) | null;
}

const Toolbar = (props: Props) => {
  const { onResetClick, saveEditor } = props
  const dispatch = useDispatch();

  const onThemeClick = () => dispatch(toggleTheme())
  const onReadModeClick = () => dispatch(toggleReadMode())
  const onPrayerClick = () => dispatch(toggleSendItIcon())


  return (
    <div className="wordBar__wrapper">
      <div className="wordBar__button wordBar__button--short" onClick={onThemeClick}>
        <FontAwesomeIcon icon={faCircleHalfStroke} />
      </div>
      <div className="wordBar__button wordBar__button--short" onClick={onResetClick}>
        <FontAwesomeIcon icon={faFeatherPointed} />
      </div>
      <div className="wordBar__button wordBar__button--short" onClick={onReadModeClick}>
        <FontAwesomeIcon icon={faGlasses} />

      </div>
      <div className="wordBar__button wordBar__button--short" onClick={onPrayerClick}>
        <FontAwesomeIcon icon={faPrayingHands} />

      </div>
      {saveEditor &&
        <div className="wordBar__button wordBar__button--short" onClick={saveEditor}>
          <i className="fas fa-save" />
        </div>}
    </div>
  )
}

export default Toolbar
