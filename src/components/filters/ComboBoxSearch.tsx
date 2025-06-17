import * as React from "react"
import { Check, ChevronDown, Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

interface ComboBoxSearchProps {
  options: Array<{ value: string; label: string }>
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  loading?: boolean
  className?: string
}

export const ComboBoxSearch: React.FC<ComboBoxSearchProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  disabled = false,
  loading = false,
  className
}) => {
  const [open, setOpen] = React.useState(false)

  // Find the selected option based on the current value
  const selectedOption = React.useMemo(() => {
    if (!value) {
      return null
    }
    
    // CORREÇÃO: Buscar a opção correspondente com comparação mais robusta
    const found = options.find((option) => {
      // Comparação exata primeiro
      if (option.value === value) return true;
      
      // Para estados, também aceitar comparação case-insensitive
      if (value.length === 2 && option.value.length === 2) {
        return option.value.toLowerCase() === value.toLowerCase();
      }
      
      // Para cidades, comparação case-insensitive
      return option.value.toLowerCase() === value.toLowerCase();
    });
    
    console.log('🔍 ComboBoxSearch - Buscando opção:', {
      value,
      options: options.slice(0, 3), // Mostrar apenas as primeiras 3 para debug
      found,
      totalOptions: options.length
    });
    
    return found || null
  }, [options, value])

  const handleSelect = (selectedValue: string) => {
    console.log('🎯 ComboBoxSearch - Selecionando:', {
      selectedValue,
      currentValue: value,
      willClear: selectedValue === value
    });
    
    // CORREÇÃO: Converter para maiúsculas se for um estado (sigla de 2 caracteres)
    // Isso garante consistência com os valores esperados nas opções
    let normalizedValue = selectedValue
    
    // Se for uma sigla de estado (2 caracteres), converter para maiúsculas
    if (selectedValue.length === 2 && /^[a-zA-Z]{2}$/.test(selectedValue)) {
      normalizedValue = selectedValue.toUpperCase()
    }
    
    // NOVA LÓGICA: Se clicar na opção "all", desmarcar (voltar para "")
    if (normalizedValue === "all") {
      if (value === "all") {
        // Se já está selecionado "all", desmarcar
        onValueChange?.("")
      } else {
        // Se não está selecionado "all", selecionar
        onValueChange?.("all")
      }
    } else {
      // Para outras opções, comportamento normal
      if (normalizedValue === value) {
        onValueChange?.("")
      } else {
        onValueChange?.(normalizedValue)
      }
    }
    setOpen(false)
  }

  // 🔄 Determinar o texto do placeholder baseado no estado
  const getPlaceholderText = () => {
    if (loading) {
      return "Carregando..."
    }
    if (disabled && !loading) {
      return "Selecione um estado primeiro"
    }
    return selectedOption?.label || placeholder
  }

  // 🔄 Determinar se deve mostrar o ícone de loading
  const showLoadingIcon = loading && !disabled

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border-gray-200 hover:border-gray-300 rounded-xl relative z-10",
            (disabled || loading) && "cursor-not-allowed",
            loading && "bg-gray-50",
            className
          )}
          disabled={disabled || loading}
        >
          <span className={cn(
            "truncate text-left flex items-center gap-2",
            !selectedOption && "text-gray-500",
            loading && "text-gray-400"
          )}>
            {/* 🔄 Ícone de loading quando carregando */}
            {showLoadingIcon && (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            )}
            {getPlaceholderText()}
          </span>
          <ChevronDown className={cn(
            "ml-2 h-4 w-4 shrink-0 opacity-50",
            loading && "opacity-30"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder={loading ? "Carregando..." : searchPlaceholder}
            disabled={loading}
          />
          <CommandList>
            {/* 🔄 Estado de loading */}
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span>Carregando opções...</span>
                </div>
              </div>
            ) : (
              <>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}