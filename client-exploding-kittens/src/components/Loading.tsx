import { Grid, Dna } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#0A9AE3"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />

      <span className="text-3xl text-[#0a9ae3]">Please Wait ....</span>
    </div>
  );
};

export default Loading;
