import {
  ExpandedSections,
  LLMVerificationAdminProps,
  PredGtMapping,
} from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { min } from "lodash";
import { useEffect } from "react";

const LLMVerifivationAdmin = (props: LLMVerificationAdminProps) => {
  const {
    matchedGtAndPred,
    currentMatchedGtAndPredIndex,
    setCurrentMatchedGtAndPredIndex,
    setExpandedSections,
  } = props;

  const startIndex = Math.max(0, currentMatchedGtAndPredIndex - 5);
  const endIndex = Math.min(
    matchedGtAndPred.length - 1,
    currentMatchedGtAndPredIndex + 5
  );

  useEffect(() => {
    // Define the function to handle the keydown event
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          nextPreviousClick(false);
          break;
        case "ArrowRight":
          nextPreviousClick(true);
          break;
        default:
          // Handle other keys if needed
          break;
      }
    };

    // Add the event listener to the window
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentMatchedGtAndPredIndex]);

  const nextPreviousClick = (next: boolean) => {
    let newIndex = currentMatchedGtAndPredIndex;
    if (next) {
      if (currentMatchedGtAndPredIndex < matchedGtAndPred.length - 1) {
        newIndex++;
      }
    } else {
      if (currentMatchedGtAndPredIndex > 0) {
        newIndex--;
      }
    }
    setCurrentMatchedGtAndPredIndex(newIndex);
    const newExpandedSections: ExpandedSections = {};
    newExpandedSections[matchedGtAndPred[currentMatchedGtAndPredIndex].case] =
      true;
    setExpandedSections(newExpandedSections);
  };

  const handleItemClick = (section: PredGtMapping) => {
    const index = matchedGtAndPred.indexOf(section);
    setCurrentMatchedGtAndPredIndex(index);
    const newExpandedSections: ExpandedSections = {};
    newExpandedSections[matchedGtAndPred[index].case] = true;
    setExpandedSections(newExpandedSections);
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentMatchedGtAndPredIndex > 0 && (
              <PaginationPrevious
                onClick={() => {
                  nextPreviousClick(false);
                }}
              >
                Previous
              </PaginationPrevious>
            )}
          </PaginationItem>

          {matchedGtAndPred.slice(startIndex, endIndex).map((section) => {
            return (
              <PaginationItem
                onClick={() => {
                  handleItemClick(section);
                }}
                key={section.case}
              >
                {section.case}
              </PaginationItem>
            );
          })}
          <PaginationItem>
            {currentMatchedGtAndPredIndex < matchedGtAndPred.length - 1 && (
              <PaginationNext
                onClick={() => {
                  nextPreviousClick(true);
                }}
              >
                Next
              </PaginationNext>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default LLMVerifivationAdmin;
