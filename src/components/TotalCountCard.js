import { FaTicketAlt } from 'react-icons/fa';

const TotalCountCard = ({ data }) => {
  return (
    <div className="w-full max-w-xs rounded-lg shadow-lg bg-white p-4 relative mx-2">
      <div className="flex items-center justify-between">
        {/* Icon with background and positioned partially outside */}
        <div
          className={`absolute -top-4 left-4 w-14 h-14 text-white flex items-center justify-center rounded-lg shadow-lg`}
          style={{ background: `${data.bgColor}` }}
        >
          {data.icon}
        </div>

        {/* Right-aligned text content */}
        <div className="ml-auto text-right">
          <h3 className="text-lg font-semibold">{data.title}</h3>
          <p className="text-sm text-gray-500">{data.subTitle}</p>
          <p className="text-3xl font-bold">{data.count || 0}</p>
        </div>
      </div>

      {/* Divider Line */}
      <div className="my-4">
        <hr className="border-gray-300" />
      </div>

      {/* Left-aligned text for percentage */}
      <p className="font-semibold text-lg">
        <span className="text-green-600 text-2xl">{data.growth}</span> than last
        week
      </p>
    </div>
  );
};

export default TotalCountCard;
