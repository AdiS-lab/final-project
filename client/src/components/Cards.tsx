export function Card(){

    return(
     <>
            <div className = 'grid grid-rows-[50px_1fr] w-100 h-150 outline-1 outline-red-500'>
                <div className = "flex items-center justify-center">
                    <h2>Card Header </h2>
                </div>
                <div className = "flex items-center justify-center">
                    <h2>Card Content  </h2>
                </div>
            </div>
        </>
    )
}   