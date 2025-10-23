import SideListChats from './SideListChats.jsx'
import ChatBored from './ChatBored.jsx'




export default function ChatInterface(){
    return(
        <div className='flex h-screen'>
            {/* Side list of chats */}
            <div className='sticky top-0 h-screen overflow-y-auto w-80'>
            <SideListChats />
            </div>
            {/* Chat area */}
            <div className='flex-1 bg-gray-100'>
                <ChatBored />
            </div>
        </div>
    )
}