import {API_URL, getter}     from "@/libs"
import {PersonCard}          from "@/widgets"
import {fetch}               from "@tauri-apps/api/http"
import {useEffect, useState} from "react"

const Workspace = () => {
  const [persons, setPersons] = useState<Person[]>()
  const fetchPersons = async () => {
    let persons = await fetch<Person[]>(API_URL + "/manager/persons").then(res => res.data)
    setPersons(persons)
  }

  useEffect(() => {
    fetchPersons().then()
  }, [])

  return <div className={"px-10"}>
    <div className={"grid grid-cols-3 lg:grid-cols-5 justify-items-center gap-y-4 my-4"}>
      {persons && persons.map(d =>
        <PersonCard key={d.name}{...d}/>
      )}
    </div>

  </div>
}

export default Workspace
