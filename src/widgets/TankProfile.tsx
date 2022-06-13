export const TankProfile = ({id, owner, sexual, genotype, species, size, amount, birthday, label}: Tank) => {
  return  <div className={"grid grid-cols-2 place-content-center w-1/2"}>
    <div>
      tank id: <span className={"font-semibold"}>{id}</span>
    </div>
    <div>
      owner: <span className={"font-semibold"}>{owner}</span>
    </div>
    <div>
      genotype: <span className={"font-semibold"}>{genotype}</span>
    </div>
    <div>
      sexual: <span className={"font-semibold"}>{sexual}</span>
    </div>
    <div>
      species: <span className={"font-semibold"}>{species}</span>
    </div>
    <div>
      birthday: <span>{birthday}</span>
    </div>
    <div>
      size: <span className={"font-semibold"}>{size}</span>
    </div>
    <div>
      amount: <span className={"font-semibold"}>{amount}</span>
    </div>
    <div>
      label: <span className={"font-semibold"}>{label}</span>
    </div>
  </div>
}
