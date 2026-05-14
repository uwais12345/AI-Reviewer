const getPullRequestDiff = async (owner, repo, prNumber) => {
  try {
    const { Octokit } = await import('octokit');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    
    // Use the custom media type to get the diff directly
    const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner,
      repo,
      pull_number: prNumber,
      headers: {
        accept: 'application/vnd.github.v3.diff'
      }
    });
    
    return response.data; // This will be the raw diff string
  } catch (error) {
    console.error("Error fetching PR diff from GitHub:", error);
    throw new Error('Failed to fetch PR diff');
  }
};

module.exports = {
  getPullRequestDiff,
};
