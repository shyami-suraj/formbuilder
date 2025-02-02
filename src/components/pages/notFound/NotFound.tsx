import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./notFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='container flex h-full min-h-[75vh] flex-col items-center justify-center bg-primaryLight py-6 md:py-8'>
      {/* SEO start */}
      <Helmet>
        <title>404 | Not Found</title>
        <meta name='description' content='404 | Not Found' />
      </Helmet>
      {/* SEO end */}

      <div className='notFound'>
        <div className='flex flex-col items-center justify-center'>
          <div className='relative'>
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <div className='relative flex items-center gap-2 -mt-16'>
            {/* <Link
              to='/'
              className='py-3 px-7 text-[.9375rem] font-semibold bg-primary rounded-md text-white no-underline border-2 border-primary  hover:bg-transparent hover:text-primary hover:border-primary'
            >
              HomePage
            </Link> */}
            <span
              onClick={() => navigate(-1)}
              role='button'
              className='py-3 px-7 text-[.9375rem] font-semibold bg-primary rounded-md text-white no-underline border-2 border-primary  hover:bg-transparent hover:text-primary hover:border-primary'
            >
              Go Back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
