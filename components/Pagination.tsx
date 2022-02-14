import { PER_PAGE } from "config";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Pagination: NextPage<{ total: number }> = ({
  total,
}) => {
  const lastPage = Math.ceil(total / PER_PAGE);
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  return (
    <div>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
