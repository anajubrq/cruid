import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ModalDelete } from "../buttons/modalDelete";
import { Edit as EditPost } from "../[id]/edit"; 
import ViewPost from "../viewPost/viewPost";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface DataTableProps {
  posts: Post[];
  deletePost: (id: number) => void;
  setAllPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export function DataTable({ posts, deletePost, setAllPosts }: DataTableProps) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [postEdit, setPostEdit] = useState<Post | undefined>(undefined);
  const [postView, setPostView] = useState<Post | undefined>(undefined);

  return (
    <section className="mt-8 z-0 ">
      <Table className="border-2 border-gray-400 rounded-lg w-full">
        <TableCaption className="text-[18px]">Recent Posts</TableCaption>
        <TableHeader className="bg-slate-300">
          <TableRow>
            <TableHead className="text-[16px] px-4 py-2 h-9 uppercase flex flex-row justify-between">
              <p>Title</p>
              <p>Actions</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="border-b border-gray-300 flex justify-between w-full">
              <TableCell className="px-4 py-2">
                <div className="flex flex-col">
                  <span className="text-[18px] font-bold">{post.title}</span>
                  <span className="text-[16px] text-gray-600">{post.body}</span>
                </div>
              </TableCell>

              <TableCell className="px-4 py-2 flex justify-end space-x-4 items-center flex-row">
                <button onClick={() => setPostView(post)}>
                  <img src="/images/view.png" className="w-[25px]" alt="View" />
                </button>
                {postView && (
                  <ViewPost
                    post={postView}
                    setOpenView={() => setPostView(undefined)} 
                  />
                )}

                
                <button onClick={() => setPostEdit(post)}>
                  <img src="/images/edit.png" className="w-[25px]" alt="Edit" />
                </button>
                {postEdit && (
                  <EditPost
                    post={postEdit}
                    setOpenModalEdit={() => setPostEdit(undefined)}
                    setAllPosts={setAllPosts}
                  />
                )}

                <button onClick={() => setOpenDelete(!openDelete)}>
                  <img src="/images/delete.png" className="w-[20px]" alt="Delete" />
                </button>
                <ModalDelete
                  isOpenDelete={openDelete}
                  setOpenDelete={setOpenDelete}
                  deletePost={() => deletePost(post.id)}
                />

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default DataTable;
