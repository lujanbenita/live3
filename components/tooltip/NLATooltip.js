import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import Link from "next/link";
import { TextIcon } from "icons/IconsLibrary";

const NLATooltip = ({ content }) => {
  const user = useSelector((state) => state.user);

  if (user.nlaPassword && user.nlaUsername) {
    return content();
  }

  return (
    <>
      <ReactTooltip
        id="nla-tooltip"
        delayHide={500}
        delayUpdate={500}
        type="light"
        effect="solid"
        className="c-tooltip"
      >
        <div>
          <p>
            You can include the full versions of NLA content in your export by
            adding your NLA credentials in the&nbsp;
            <Link href="/my-account/my-settings">
              <a className="c-tooltip__link" target="_blank">
                Settings page
              </a>
            </Link>
            .
          </p>
        </div>
      </ReactTooltip>
      <span
        aria-hidden="true"
        data-tip
        data-place="top"
        data-for="nla-tooltip"
        className="c-input-search-option__tooltip-icon"
      >
        <span className="c-tooltip__icon">
          <TextIcon />
        </span>
        {content()}
      </span>
    </>
  );
};

export default NLATooltip;
