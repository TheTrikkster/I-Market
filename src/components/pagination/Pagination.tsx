type PaginationType = {
  currentPage: number;
  totalPages: any;
  onPageChange: any;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationType) {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 3);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage
  );

  return (
    <div>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={
            page === currentPage ? { backgroundColor: "lightgrey" } : undefined
          }
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
}
export default Pagination;
