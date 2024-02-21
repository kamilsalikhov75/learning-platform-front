import { Select, Props } from "chakra-react-select";
import { Job, getJobs, useJobs } from "entities/job";
import { useEffect } from "react";

export const JobsSelect = (props: Props<Job>) => {
  const { jobs } = useJobs();

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <Select
      getOptionValue={(option) => `${option["_id"]}`}
      getOptionLabel={(option) => `${option["title"]}`}
      options={jobs}
      {...props}
    />
  );
};
