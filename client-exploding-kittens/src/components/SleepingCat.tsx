import classes from "./SleepingCat.module.css";

const SleepingCat = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.shadow}></div>
        <div className={classes.cat}>
          <div className={classes.ear}></div>
          <div className={classes.eye}></div>
          <div className={classes.mouth}></div>
          <div className={classes.nose}></div>
          <div className={classes.tail}></div>
          <div className={classes.body}></div>
          <div className={classes.bubble}></div>
        </div>
      </div>
    </div>
  );
};

export default SleepingCat;
