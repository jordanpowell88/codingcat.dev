export default function Tutorials({
  className = 'block w-8 h-8',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clipTutorials)">
        <path
          d="M12.25 3H11.75V3.5V5.40419C10.9787 5.05735 10.1394 4.83017 9.25004 4.76756V2.71195C9.25004 1.47741 10.2189 0.5 11.375 0.5H32.3751C33.5312 0.5 34.5001 1.47741 34.5001 2.71195V20.038C34.5001 21.2726 33.5312 22.25 32.3751 22.25H19.3774C19.0841 21.3236 18.6171 20.4794 18.0134 19.75H21.0001H21.5001V19.25V16.25H27.5001V19.25V19.75H28.0001H31.5001H32.0001V19.25V3.5V3H31.5001H12.25ZM11.1433 19.7852C11.2145 19.7621 11.2928 19.75 11.375 19.75C14.4919 19.75 17.0166 22.2852 17.0001 25.4062C16.9939 26.5623 16.0415 27.5 14.875 27.5H2.62503C1.45856 27.5 0.506186 26.5623 0.500022 25.4062C0.483448 22.2852 3.00821 19.75 6.12504 19.75C6.20702 19.75 6.28479 19.762 6.35622 19.7852C7.10362 20.0278 7.90179 20.1875 8.75004 20.1875C9.59824 20.1875 10.3964 20.0278 11.1433 19.7852ZM13.5 12.25C13.5 14.8734 11.3734 17 8.75004 17C6.12665 17 4.00003 14.8734 4.00003 12.25C4.00003 9.62661 6.12665 7.5 8.75004 7.5C11.3734 7.5 13.5 9.62661 13.5 12.25Z"
          fill="#BC2261"
        />
      </g>
      <defs>
        <clipPath id="clipTutorials">
          <rect width="35" height="35" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
