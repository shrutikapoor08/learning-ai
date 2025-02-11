type PropertyActionsProps = {
  onLike: () => Promise<void>;
  onDislike: () => Promise<void>;
};

function PropertyActions({ onLike, onDislike }: PropertyActionsProps) {
  return (
    <div className="flex flex-row justify-center align-center">
      <button
        onClick={onLike}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
      >
        Like
      </button>
      <button
        onClick={onDislike}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
      >
        Dislike
      </button>
    </div>
  );
}

export default PropertyActions;
