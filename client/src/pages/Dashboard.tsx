import React from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Total Equipment', 
      value: '24', 
      change: '+2',
      icon: Activity,
      color: 'text-blue-600',
      changeColor: 'text-green-600'
    },
    { 
      label: 'Pending Maintenance', 
      value: '8', 
      change: '-3',
      icon: Clock,
      color: 'text-yellow-600',
      changeColor: 'text-red-600'
    },
    { 
      label: 'Completed Tasks', 
      value: '42', 
      change: '+5',
      icon: CheckCircle,
      color: 'text-green-600',
      changeColor: 'text-green-600'
    },
    { 
      label: 'Urgent Issues', 
      value: '3', 
      change: '+1',
      icon: AlertTriangle,
      color: 'text-red-600',
      changeColor: 'text-red-600'
    },
  ];

  const recentMaintenance = [
    {
      title: 'CNC Machine Maintenance',
      description: 'Scheduled for tomorrow',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Drill Press Calibration',
      description: 'Due in 3 days',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Conveyor Belt Inspection',
      description: 'Completed today',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeColor}`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Maintenance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Maintenance</h2>
          <div className="space-y-4">
            {recentMaintenance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Equipment Status</h2>
          <div className="space-y-3">
            {[
              { status: 'Active', count: 18, color: 'bg-green-500' },
              { status: 'Maintenance', count: 4, color: 'bg-yellow-500' },
              { status: 'Inactive', count: 2, color: 'bg-red-500' }
            ].map((item) => (
              <div key={item.status} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
                  <span className="text-gray-600">{item.status}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center">
            Add New Equipment
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center">
            Schedule Maintenance
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;