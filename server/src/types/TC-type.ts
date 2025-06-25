export type TestCase = {
  id: string;
  stdin: string[];
  stdout: string[];
};

export type TestCaseList = {
  testcases: TestCase[];
};
