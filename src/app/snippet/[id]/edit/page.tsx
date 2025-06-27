import CodeEditor from '@/components/CodeEditor';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

const EditSnippet = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({ where: { id } });

  if (!snippet) return notFound();

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <CodeEditor snippet={snippet} />
    </div>
  );
};

export default EditSnippet;
