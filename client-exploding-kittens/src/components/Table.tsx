import { LeaderBoardUser } from "../interfaces/LeaderBoard.interface";
import classes from "./Table.module.css";

interface TableProps {
  scores: LeaderBoardUser[];
}
const Table = ({ scores }: TableProps) => {
  return (
    <table className={classes.table}>
      <caption>Leadership</caption>
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Username</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((item, index) => {
          const { _id, username, score } = item;
          return (
            <tr>
              <td scope="row" data-label="Rank">
                {index + 1}
              </td>
              <td data-label="Username">{username}</td>
              <td data-label="Score">{score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
