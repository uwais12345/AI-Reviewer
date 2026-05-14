import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GitPullRequest, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { getDashboardStats, getPullRequests } from '../services/api';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="glass-panel p-6 flex items-center justify-between">
    <div>
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-opacity-20 ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const SeverityBadge = ({ severity }) => {
  const colors = {
    LOW: 'bg-green-500/20 text-green-400 border-green-500/30',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[severity] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
      {severity || 'PENDING'}
    </span>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, prsRes] = await Promise.all([
          getDashboardStats(),
          getPullRequests()
        ]);
        setStats(statsRes.data);
        setPrs(prsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total PRs" 
          value={stats?.totalPrs || 0} 
          icon={GitPullRequest} 
          colorClass="bg-blue-500 text-blue-400" 
        />
        <StatCard 
          title="Reviewed" 
          value={stats?.reviewedPrs || 0} 
          icon={CheckCircle} 
          colorClass="bg-green-500 text-green-400" 
        />
        <StatCard 
          title="Pending" 
          value={stats?.pendingPrs || 0} 
          icon={Clock} 
          colorClass="bg-slate-500 text-slate-400" 
        />
        <StatCard 
          title="Critical Issues" 
          value={stats?.severityDistribution?.CRITICAL || 0} 
          icon={AlertTriangle} 
          colorClass="bg-red-500 text-red-400" 
        />
      </div>

      {/* Recent PRs */}
      <div className="glass-panel p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Pull Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-sm">
                <th className="pb-3 font-medium">Pull Request</th>
                <th className="pb-3 font-medium">Repository</th>
                <th className="pb-3 font-medium">Author</th>
                <th className="pb-3 font-medium">Severity</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {prs.map(pr => (
                <tr key={pr._id} className="group hover:bg-slate-800/30 transition-colors">
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-200">#{pr.prNumber} {pr.title}</span>
                      <span className="text-xs text-slate-500">{new Date(pr.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-300">{pr.repositoryId.repoName}</td>
                  <td className="py-4 text-slate-300">{pr.author}</td>
                  <td className="py-4">
                    <SeverityBadge severity={pr.latestReview?.severity} />
                  </td>
                  <td className="py-4">
                    {pr.latestReview?.score ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${pr.latestReview.score >= 80 ? 'bg-green-500' : pr.latestReview.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${pr.latestReview.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{pr.latestReview.score}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="py-4">
                    <Link 
                      to={`/pr/${pr._id}`}
                      className="text-primary hover:text-blue-400 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {prs.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No pull requests found. Setup webhook to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
