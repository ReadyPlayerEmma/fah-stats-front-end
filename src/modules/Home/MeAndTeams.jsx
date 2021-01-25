import React, { useState } from 'react';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { css } from '@emotion/react';
import { getDonorByName } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';

const styles = {
  container: css`
    margin: 1rem 0;
  `,
  width5: css`
    width: 5rem;
  `,
  width10: css`
    width: 10rem;
  `,
  width15: css`
    width: 15rem;
  `,
  searchInput: css`
    position: relative;
  `,
  clearIcon: css`
    position: absolute;
    right: 0;
    padding: 0.5rem;
    cursor: pointer;
  `,
  teams: css`
    > div {
      margin-bottom: 1rem;
    }
  `,
};
const MeAndTeams = () => {
  const dispatch = useDispatch();
  const [donorName, setDonorName] = useState();
  const triggerSearch = () => {
    dispatch(getDonorByName({ donorName }));
  };
  const clearSearch = () => {
    setDonorName();
    dispatch(getDonorByName({}));
  };
  const stats = useSelector((state) => state.stats);
  const myself = stats?.myself?.[0];

  return myself ? (
    <>
      <h2>{`${myself.name} (${myself.id})`}</h2>
      <div>{`Score: ${myself.score}`}</div>
      <div>{`Rank: ${myself.rank || '-'}`}</div>
      <div>{`WUs: ${myself.wus}`}</div>
      <br />
      <h2>Teams</h2>
      <div css={styles.teams}>
        {myself?.teams && myself.teams.map((team) => (
          <div>
            <h4>{`${team.name} (${team.team})`}</h4>
            <div>{`Score: ${team.score}`}</div>
            <div>{`WUs: ${team.wus}`}</div>
          </div>
        ))}
      </div>
      <br />
      <Button type="primary" onClick={clearSearch}>Change Donor Name</Button>
    </>
  ) : (
    <Form
      css={styles.container}
      onFinish={triggerSearch}
    >
      <div>
        <span css={styles.searchInput}>
          <Input
            placeholder="Search Donor Name"
            type="text"
            value={donorName}
            onChange={(event) => setDonorName(event.target.value)}
            css={styles.width15}
          />
          { donorName && (
            <CloseCircleOutlined
              css={styles.clearIcon}
              onClick={clearSearch}
            />
          ) }
        </span>
        <Button type="primary" htmlType="submit">
          <SearchOutlined />
          Search Donor Name
        </Button>
      </div>
    </Form>
  );
};

export default MeAndTeams;
