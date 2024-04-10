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

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {entityAnnotationSections.map((section: SectionInfo[]) => {
            return (
              <PaginationItem key={section[0].key}>
                {section[0].key}
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MultTextAdmin;
