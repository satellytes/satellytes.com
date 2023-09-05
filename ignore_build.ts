// 1 -> continue build
// 0 -> stop build

console.log(process.env);
if (process.env.CONTEXT !== 'branch.preview') {
  process.exitCode = 1;
} else {
  const pull_number = process.env.REVIEW_ID;
  const owner = 'satellytes';
  const repo = 'satellytes.com';
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`;
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const params = {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    method: 'GET',
  };
  fetch(url, params)
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      const shouldBuild = res.labels.find(
        (label) => label.name === 'deploy-me',
      );
      return shouldBuild ? 1 : 0;
    });
}
