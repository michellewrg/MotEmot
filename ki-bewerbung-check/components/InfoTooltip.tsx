import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InfoTooltipProps = {
  content: string;
};

function InfoTooltip({ content }: InfoTooltipProps) {

  return (
    <div className="tooltip px-2.5 mb-2 rounded-full border border-accent" data-tip={content}>
        <FontAwesomeIcon icon="exclamation" size="xs" className="text-accent" />
    </div> 
  );
}

export default InfoTooltip;
