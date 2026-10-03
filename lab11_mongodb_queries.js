// FSD Lab 11 - MongoDB Databases, Collections, Queries,
// Sorting, Limit, Index and Aggregation

// Select database
use("library");

// Create collection
db.createCollection("books");

// Insert sample documents
db.books.insertMany([
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    price: 12.99
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction",
    price: 14.99
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Classic",
    price: 10.99
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    year: 1851,
    genre: "Adventure",
    price: 9.99
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    genre: "Dystopian",
    price: 11.99
  }
]);

// View collections
show collections;

// Find all books sorted by year ascending
db.books.find().sort({ year: 1 });

// Get first 3 books
db.books.find().limit(3);

// Find books by genre
db.books.find({ genre: "Dystopian" });

// Create index on author
db.books.createIndex({ author: 1 });

// View indexes
db.books.getIndexes();

// Aggregation 1: Count books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
]);

// Aggregation 2: Average price by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      avgPrice: { $avg: "$price" }
    }
  },
  {
    $sort: { avgPrice: -1 }
  }
]);

// Aggregation 3: Filter, group, sort and project
db.books.aggregate([
  {
    $match: {
      year: { $gt: 1900 }
    }
  },
  {
    $group: {
      _id: "$genre",
      count: { $sum: 1 },
      avgPrice: { $avg: "$price" }
    }
  },
  {
    $sort: {
      count: -1
    }
  },
  {
    $project: {
      genre: "$_id",
      count: 1,
      avgPrice: 1,
      _id: 0
    }
  }
]);

// Drop collection
db.books.drop();

// Drop database
db.dropDatabase();