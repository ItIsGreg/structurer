import { AnnotationDocument, MultTextAdminProps, SectionInfo } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect } from "react";

const MultTextAdmin = (props: MultTextAdminProps) => {
  const {
    annotationDocumentIndex,
    setAnnotationDocumentIndex,
    annotationDocuments,
  } = props;

  useEffect(() => {
    // Define the function to handle the keydown event
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handleNextPreviousClick(false);
          break;
        case "ArrowRight":
          handleNextPreviousClick(true);
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
  }, [annotationDocumentIndex]);

  const handleItemClick = (annotationDocument: AnnotationDocument) => {
    // save current sections that were edited
    const documentIndex = getDocumentIndex(annotationDocument);
    setAnnotationDocumentIndex(documentIndex);
    // set new outline
  };

  const handleNextPreviousClick = (next: boolean) => {
    let nextIndex = annotationDocumentIndex;
    if (next) {
      nextIndex++; // Move to the next item if 'next' is true
    } else {
      nextIndex--; // Move to the previous item if 'next' is false
    }
    if (nextIndex >= 0 && nextIndex <= annotationDocuments.length - 1) {
      setAnnotationDocumentIndex(nextIndex);
    }
  };

  const getDocumentIndex = (annotationDocument: AnnotationDocument) => {
    const index = annotationDocuments.findIndex(
      (document) => document.name === annotationDocument.name
    );
    return index;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {annotationDocumentIndex > 0 && (
            <PaginationItem>
              <PaginationPrevious
                className="border p-1"
                onClick={() => {
                  handleNextPreviousClick(false);
                }}
              />
            </PaginationItem>
          )}
          {annotationDocuments.map((annotationDocument) => {
            return (
              <PaginationItem
                key={annotationDocument.name}
                onClick={() => {
                  handleItemClick(annotationDocument);
                }}
              >
                {annotationDocument.name}
              </PaginationItem>
            );
          })}
          {annotationDocumentIndex < annotationDocuments.length - 1 && (
            <PaginationItem>
              <PaginationNext
                className="border p-1"
                onClick={() => {
                  handleNextPreviousClick(true);
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MultTextAdmin;
