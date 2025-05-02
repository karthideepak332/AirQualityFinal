import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function StatusCard({ isDanger }) {
  const cardStyle = isDanger
    ? 'from-red-600 to-pink-500'
    : 'from-green-600 to-emerald-500';
  const icon = isDanger ? (
    <AlertTriangle className="w-6 h-6 mr-2 text-white" />
  ) : (
    <CheckCircle className="w-6 h-6 mr-2 text-white" />
  );
  const title = isDanger ? 'Warning: Unsafe Conditions' : 'All Systems Normal';
  const message = isDanger
    ? 'Some parameters are above safe thresholds.'
    : 'No current alerts or warnings.';

  return (
    <div
      className={`bg-gradient-to-br ${cardStyle} text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out text-center backdrop-blur-sm`}
    >
      <div className="flex items-center justify-center mb-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-white/80">{message}</p>
    </div>
  );
}
