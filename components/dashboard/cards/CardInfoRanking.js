import { useState } from "react";
import { useSelector } from "react-redux";

import ToneCircle from "components/dashboard/molecules/ToneCircle";

import ordinalSuffixOfSeparated from "@/utils/ordinalSuffixOf";
import { exportChart } from "@/utils/exportChart";
import { checkNumberForColor } from "../../../utils/checkNumberFor";
import CompanyAvatar from "../atoms/CompanyAvatarCard";
import OptionsButton from "../../common/buttons/OptionsButton";
import ToneText from "../atoms/ToneText";
import ModalInfo from "../../common/modal/ModalInfo";
import { getSign } from "../../../utils/numberSignQuantityFormatter";

export default function CardInfoScore({ title, data, ...props }) {
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const tags = useSelector((state) => state.searchObject.tags);
  const selectedTag = useSelector((state) => state.searchObject?.selectedTag);
  const { logo, position, name, change, quarter, year } = data;

  const img = logo ? `data:image/png;base64,${logo}` : null;
  const positionText =
    position !== "-" ? ordinalSuffixOfSeparated(position) : position;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <div className="c-card" id={idPrint}>
      <div className="c-card__header">
        <div className="c-card__title">{title}</div>
      </div>
      <div className="c-card__body">
        <div className="c-info-ranking-card__column c-info-ranking-card__tag-info">
          <CompanyAvatar brand={name} image={img} />
          <span className="c-info-ranking-card__name">
            {selectedTag?.tagName}
          </span>
        </div>
        <div className="c-info-ranking-card__column c-info-ranking-card__score-info">
          <span
            className={`c-info-ranking-card__score-text  ${
              quarter && year
                ? "c-info-ranking-card__score-text--with-quarter"
                : ""
            }`}
          >
            {position ? `${positionText}` : "-"}
          </span>
          {quarter && year && (
            <span className="c-info-ranking-card__score-quarter">
              <span className="c-info-ranking-card__year">{year}</span>
              <span className="c-info-ranking-card__quarter">Q{quarter}</span>
            </span>
          )}
        </div>
        <div className="c-info-ranking-card__column c-info-ranking-card__change-info">
          <div className="c-info-ranking-card__change-info-wrapper">
            <ToneCircle value={change}></ToneCircle>
            <div className="c-info-ranking-card__change-text">
              <span className="c-info-ranking-card__change-label">
                {props.text}
              </span>
              <ToneText
                className="c-info-ranking-card__change-value"
                value={checkNumberForColor(change).color}
              >
                {change ? `${getSign(change)}${Math.abs(change)}` : "-"}
              </ToneText>
            </div>
          </div>
        </div>
      </div>
      <div className="c-card__options-wrapper">
        <OptionsButton
          id={`widget-${Buffer.from(title).toString("base64")}`}
          color="#9b9b9b"
          className="c-export-button__chart"
          options={[
            {
              label: "What is this?",
              action: () => {
                setIsOpenModal(true);
              },
              icon: "info",
            },
            {
              label: `Download image`,
              action: () => {
                exportChart(title, tags, dateRange, idPrint);
              },
              icon: "camera",
            },
          ]}
        />
      </div>
      <ModalInfo
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        message={props.modalContent}
      />
    </div>
  );
}
