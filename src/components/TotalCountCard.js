const TotalCountCard = ({ data }) => {
  return (
    <div className="w-full max-w-xs rounded-lg shadow-lg bg-white p-2 relative mx-2">
      {/* Icon */}
      <div
        className={`absolute -top-4 left-2 w-14 h-14 text-white flex items-center justify-center rounded-lg shadow-lg`}
        style={{ background: `${data.bgColor}` }}
      >
        {data.icon}
      </div>

      {/* Content with padding-left to prevent overlap */}
      <div className="pl-2">
        {/* Title and Count */}
        <div className="text-right">
          <h3 className="text-lg font-semibold">{data.title}</h3>
          <p className="text-sm text-gray-500">{data.subTitle}</p>
          <p className="text-3xl font-bold">{data.count || 0}</p>
        </div>

        {/* Divider Line */}
        <div className="my-4">
          <hr className="border-gray-300" />
        </div>

        {/* Growth Text */}
        <p className="font-semibold text-lg">
          <span className="text-green-600 text-2xl">{data.growth}</span> than last week
        </p>
      </div>
    </div>
  );
};


export default TotalCountCard;
