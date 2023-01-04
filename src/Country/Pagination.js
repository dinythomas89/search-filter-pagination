import React from "react";

const Pagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  return (
    <ul className="pagination">
      <li onClick={previousPage} className="page-number">
        Prev
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`page-number ${(currentPage = number ? "active" : "")}`}
        >
          {number}
        </li>
      ))}
      <li onClick={nextPage} className="page-number">
        Next
      </li>
    </ul>
  );
};

export default Pagination;
