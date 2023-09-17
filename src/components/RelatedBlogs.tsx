import React from "react";
import { IBlogData } from "../pages/blog";
import Link from "next/link";
interface Props {
  data: IBlogData[];
}
const RelatedBlogs: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h4 className="mtext-112 cl2 mb-3">Related Blogs</h4>

      <ul>
        {data.map((el) => {
          return (
            <li key={el.id} className="mb-4">
              <Link href={`/blog/${el.id}`}>
                <a className="wrao-pic-w">
                  <img src={el.img} alt="PRODUCT" className="img-fluid" />

                  <div className="p-t-8 mt-1">
                    <div className="stext-116 cl8 hov-cl1 trans-04 mb-3">
                      {el.title}
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedBlogs;
