
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/mosheshtaygrud/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/mosheshtaygrud/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/mosheshtaygrud/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/mosheshtaygrud/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path --no-rehash)"
#eval "$(pyenv virtualenv-init -)"
export PATH=/usr/local/Cellar/mongodb-community/7.0.2/bin:$PATH
export PATH=/usr/local/bin:$PATH
export OPENAI_API_KEY='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'
export ANTHROPIC_API_KEY = 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
