import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link
      to={`/books/${book.id}`}
      className="border p-3 rounded-lg shadow-sm hover:shadow-md transition"
    >
      <img
        src={book.image}
        alt={book.title}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="font-semibold mt-2">{book.title}</h3>
      <p className="text-gray-600 text-sm">{book.author}</p>
    </Link>
  );
}
