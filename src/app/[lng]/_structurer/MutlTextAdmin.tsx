import { MultTextAdminProps, SectionInfo } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MultTextAdmin = (props: MultTextAdminProps) => {
  const {
    entityAnnotationSections,
    setEntityAnnotationSections,
    outline,
    setOutline,
  } = props;

  const saveCurrentSections = () => {
    setEntityAnnotationSections(
      entityAnnotationSections.map((sections) => {
        if (outline[0].key === sections[0].key) {
          return outline;
        } else {
          return sections;
        }
      })
    );
  };

  const getCurrentSectionsIndex = () => {
    // section might have been altered by annotation
    const correspondingSection = entityAnnotationSections.filter((sections) => {
      return sections[0].key === outline[0].key;
    });
    const currentIndex = entityAnnotationSections.indexOf(
      correspondingSection[0]
    );
    return currentIndex;
  };

  const handleItemClick = (section: SectionInfo[]) => {
    // save current sections that were edited
    saveCurrentSections();
    // set new outline
    setOutline(section);
  };

  const handleNextPreviousClick = (next: boolean) => {
    const currentIndex = getCurrentSectionsIndex();
    saveCurrentSections();
    // set next outline
    let nextIndex = currentIndex;
    if (next) {
      nextIndex++; // Move to the next item if 'next' is true
    } else {
      nextIndex--; // Move to the previous item if 'next' is false
    }
    setOutline(entityAnnotationSections[nextIndex]);
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {getCurrentSectionsIndex() > 0 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  handleNextPreviousClick(true);
                }}
              />
            </PaginationItem>
          )}
          {entityAnnotationSections.map((section: SectionInfo[]) => {
            return (
              <PaginationItem
                key={section[0].key}
                onClick={() => {
                  handleItemClick(section);
                }}
              >
                {section[0].key}
              </PaginationItem>
            );
          })}
          {getCurrentSectionsIndex() < entityAnnotationSections.length - 1 && (
            <PaginationItem>
              <PaginationNext
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
