import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import PageTitle from "../../components/PageTitle";
import RelatedBlogs from "../../components/RelatedBlogs";

import { IBlogData } from ".";
interface Props {
  dataSingleBlog: IBlogData;
  dataBlogFeature: IBlogData[];
}

const BlogDetail: NextPage<Props> = ({ dataSingleBlog, dataBlogFeature }) => {
  return (
    <>
      <Head>
        <title>Store - title</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={dataSingleBlog.title} />

      <section className="bg0 p-t-52 p-b-20">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                <div className="wrap-pic-w how-pos5-parent">
                  <img src={dataSingleBlog.img} alt="IMG-BLOG" />
                </div>

                <div className="p-t-32">
                  <span className="flex-w align-items-center flex-m stext-111 cl2 p-b-19">
                    <span className="flex-c-m mr-3 bor7 p-lr-15 trans-04">
                      {dataSingleBlog.category}
                    </span>

                    <span>
                      <span className="cl4">By</span> {dataSingleBlog.author}
                      <span className="cl12 m-l-4 m-r-6">|</span>
                    </span>

                    <span>{dataSingleBlog.date}</span>
                  </span>

                  <h4 className="ltext-109 cl2 p-b-28">
                    {dataSingleBlog.title}
                  </h4>

                  <p className="stext-117 cl6 p-b-26">
                    {dataSingleBlog.first_content}
                  </p>

                  <p className="stext-117 cl6 p-b-26">
                    {dataSingleBlog.second_content}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <RelatedBlogs data={dataBlogFeature} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
export const getStaticPaths: GetStaticPaths = async () => {
  const resBlogs = await fetch(`http://localhost:5001/blogs`);
  const dataBlogs = await resBlogs.json();

  const paths = dataBlogs.map((el: IBlogData) => {
    return {
      params: {
        id: el.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  if (id) {
    const resBlogs = await fetch(`http://localhost:5001/blogs`);
    const dataBlogs = await resBlogs.json();

    const randomStart = Math.floor(Math.random() * dataBlogs.length) + 1;

    const resBlogFeature = await fetch(
      `http://localhost:5001/blogs?_start=${randomStart}&_limit=3`
    );
    const dataBlogFeature = await resBlogFeature.json();

    const resSingleBlog = await fetch(`http://localhost:5001/blogs/${id}`);
    const dataSingleBlog = await resSingleBlog.json();
    return {
      props: { dataSingleBlog, dataBlogFeature },
    };
  }

  return {
    props: {},
  };
};
