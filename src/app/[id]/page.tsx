import { notFound } from 'next/navigation';

// Example data array
const chats = [
  {id: "c001", assignmentId: "a001", studentId: "s001"},
  {id: "c002", assignmentId: "a001", studentId: "s002"},
  {id: "c003", assignmentId: "a002", studentId: "s001"},
];


// Function to generate static paths
export async function generateStaticParams() {
  return chats.map((item) => ({
    id: item.id,
  }));
}

// Dynamic page component
const ChatPage = ({ params }: { params: { id: string } }) => {
  const pageData = chats.find((item) => item.id === params.id);
  if (!pageData) {
    notFound(); // Handle 404
  }

  return (
    <div>
      <h1>{pageData.id}</h1>
      <p>{pageData.assignmentId}</p>
      <p>{pageData.studentId}</p>
    </div>
  );
};

export default ChatPage;

