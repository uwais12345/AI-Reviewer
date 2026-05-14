import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { getPullRequestById, getReviewsByPrId } from '../services/api';

const SeverityBadge = ({ severity }) => {
  const colors = {
    LOW: 'bg-green-500/20 text-green-400 border-green-500/30',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wider ${colors[severity] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
      {severity}
    </span>
  );
};

const PRDetails = () => {
  const { id } = useParams();
  const [pr, setPr] = useState(null);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prRes, reviewsRes] = await Promise.all([
          getPullRequestById(id),
          getReviewsByPrId(id)
        ]);
        setPr(prRes.data);
        if (reviewsRes.data.length > 0) {
          setReview(reviewsRes.data[0]); // Get the most recent review
        }
      } catch (error) {
        console.error("Error fetching PR details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div></div>;
  if (!pr) return <div className="p-6 text-center text-slate-400">Pull Request not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <Link to="/" className="inline-flex items-center text-sm text-slate-400 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      {/* Header Section */}
      <div className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-100">#{pr.prNumber} {pr.title}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              pr.status === 'opened' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
            }`}>
              {pr.status.toUpperCase()}
            </span>
          </div>
          <p className="text-slate-400">
            opened by <span className="text-slate-200 font-medium">{pr.author}</span> in <span className="text-slate-200 font-medium">{pr.repositoryId.repoName}</span>
          </p>
        </div>
        
        <a 
          href={pr.githubUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          <GitBranch className="w-4 h-4" /> View on GitHub
        </a>
      </div>

      {!review ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-200">Review Pending</h3>
          <p className="text-slate-400 mt-2">The AI is currently analyzing this pull request or no review was generated.</p>
        </div>
      ) : (
        <>
          {/* AI Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" /> AI Review Summary
              </h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {review.summary}
              </p>
            </div>
            
            <div className="glass-panel p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-slate-400 text-sm font-medium mb-4">Quality Score</h3>
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" className="text-slate-800 stroke-current" strokeWidth="12" fill="none" />
                  <circle 
                    cx="64" cy="64" r="56" 
                    className={`${review.score >= 80 ? 'text-green-500' : review.score >= 50 ? 'text-yellow-500' : 'text-red-500'} stroke-current`} 
                    strokeWidth="12" 
                    fill="none" 
                    strokeDasharray={351.858} 
                    strokeDashoffset={351.858 - (351.858 * review.score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{review.score}</span>
                  <span className="text-xs text-slate-500">/ 100</span>
                </div>
              </div>
              <SeverityBadge severity={review.severity} />
            </div>
          </div>

          {/* Suggestions List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold px-1">Issues & Suggestions</h2>
            
            {review.suggestions && review.suggestions.length > 0 ? (
              review.suggestions.map((suggestion, idx) => (
                <div key={idx} className="glass-card p-0 overflow-hidden">
                  <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-700/50 flex justify-between items-center">
                    <span className="font-mono text-sm text-blue-400">{suggestion.file}</span>
                    <SeverityBadge severity={suggestion.severity} />
                  </div>
                  <div className="p-6">
                    <h4 className="text-slate-200 font-medium mb-3">{suggestion.issue}</h4>
                    
                    {suggestion.fix && (
                      <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mt-4 overflow-x-auto">
                        <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                          <CheckCircle className="w-4 h-4 text-green-500" /> Suggested Fix
                        </div>
                        <pre className="text-sm font-mono text-slate-300">
                          <code>{suggestion.fix}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel p-8 text-center text-slate-400">
                No specific issues found. Great job!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PRDetails;
